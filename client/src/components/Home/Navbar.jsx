import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout, getCurrentUser } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  navigationItems,
  userNavigationItems,
} from "@/components/Home/NavbarLinks";
import Logo from "../ui/logo";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      toast({
        title: "Failed to load user data",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/sign-in");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex gap-4">
          <Logo />
          <nav className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger>
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.items.map((subItem) => {
                              const Icon = subItem.icon;
                              return (
                                <li key={subItem.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      className="group select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center"
                                      to={subItem.href}
                                    >
                                      {Icon && (
                                        <Icon className="mr-2 h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                      )}
                                      <div>
                                        <div className="text-sm font-medium leading-none">
                                          {subItem.title}
                                        </div>
                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                          {subItem.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              );
                            })}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {localStorage.getItem("token") ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  {isLoading ? (
                    <Skeleton className="h-8 w-8 rounded-full" />
                  ) : (
                    <Avatar>
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name ? user.name.charAt(0) : ""}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.role || "User"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userNavigationItems.map((item) => (
                  <DropdownMenuItem key={item.title} asChild>
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/sign-in">Sign in</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <DialogTitle className="text-2xl font-bold mb-4">
              School Sync
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mb-4">
              Access your school management dashboard and resources
            </DialogDescription>
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  {item.items ? (
                    <>
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <ul className="space-y-2 ml-4">
                        {item.items.map((subItem) => {
                          const Icon = subItem.icon;
                          return (
                            <li
                              key={subItem.title}
                              className="flex items-center"
                            >
                              {Icon && (
                                <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                              )}
                              <Link
                                to={subItem.href}
                                className="text-sm hover:underline"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-lg font-medium hover:underline"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-auto pt-4 border-t">
              {isLoading ? (
                <div className="flex items-center space-x-4 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-[100px] mb-2" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name ? user.name.charAt(0) : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.role || "No role"}
                    </p>
                  </div>
                </div>
              )}
              {localStorage.getItem("token") ? (
                <>
                  {userNavigationItems.map((item) => (
                    <Button
                      key={item.title}
                      variant="outline"
                      className="w-full mb-2"
                      asChild
                    >
                      <Link to={item.href}>{item.title}</Link>
                    </Button>
                  ))}
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full mb-2" asChild>
                    <Link to="/sign-in">Sign in</Link>
                  </Button>
                  <Button variant="default" className="w-full" asChild>
                    <Link to="/sign-up">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
