import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TagInput = ({
  initialValue = "",
  onChange,
  placeholder = "Add tags...",
  className = "",
  maxTags,
  maxTagLength,
  disabled = false,
}) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialValue) {
      const initialTags = initialValue
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      setTags(initialTags);
    }
  }, [initialValue]);

  useEffect(() => {
    const tagsString = tags.join(", ");
    onChange?.(tagsString);
  }, [tags, onChange]);

  const validateTag = (tag) => {
    if (!tag.trim()) {
      setError("Tag cannot be empty");
      return false;
    }

    if (maxTagLength && tag.length > maxTagLength) {
      setError(`Tag must be ${maxTagLength} characters or less`);
      return false;
    }

    if (maxTags && tags.length >= maxTags) {
      setError(`Maximum ${maxTags} tags allowed`);
      return false;
    }

    if (tags.includes(tag.trim())) {
      setError("Tag already exists");
      return false;
    }

    setError(null);
    return true;
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (validateTag(trimmedValue)) {
      setTags((prev) => [...prev, trimmedValue]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(null);
  };

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1"
          aria-label="Tag input"
          aria-invalid={!!error}
          aria-describedby={error ? "tag-input-error" : undefined}
        />
        <Button
          type="button"
          onClick={addTag}
          disabled={disabled || !inputValue.trim()}
          size="icon"
          aria-label="Add tag"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {error && (
        <p
          id="tag-input-error"
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" role="listitem">
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => removeTag(tag)}
              disabled={disabled}
              aria-label={`Remove ${tag} tag`}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
