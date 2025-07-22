import { CommandGroup, CommandItem, CommandList } from "./Command";
// @ts-ignore: no bundled types for "cmdk"
import { Command as CommandPrimitive } from "cmdk";
import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Skeleton } from "./Skeleton";
import styles from "./AutoComplete.module.css";

export type Option<T = unknown> = {
  value: string;
  label: ReactNode;
  displayText?: string;
  metadata?: T;
};

const getDisplayText = <T,>(option: Option<T>): string => {
  if (option.displayText) return option.displayText;
  if (typeof option.label === "string") return option.label;
  return option.value;
};

type AutoCompleteProps<T = unknown> = {
  options: Option<T>[];
  emptyMessage: string;
  value?: Option<T>;
  onValueChange?: (value: Option<T>) => void;
  inputValue: string;
  onInputValueChange: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  allowFreeForm?: boolean;
};

export const AutoComplete = <T = unknown,>({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  inputValue,
  onInputValueChange,
  disabled,
  isLoading = false,
  allowFreeForm = false,
}: AutoCompleteProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option<T> | undefined>(value);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (event.key === "Enter" && input.value !== "") {
        const opt = options.find(
          (o) => getDisplayText(o) === input.value
        );
        if (opt) {
          setSelected(opt);
          onValueChange?.(opt);
        }
      }

      if (event.key === "Escape") {
        input.blur();
        setOpen(false);
      }
    },
    [options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    if (!isOpen && !allowFreeForm) {
      onInputValueChange(selected ? getDisplayText(selected) : "");
    }
  }, [selected, isOpen, onInputValueChange, allowFreeForm]);

  const handleSelectOption = useCallback(
    (opt: Option<T>) => {
      onInputValueChange(getDisplayText(opt));
      setSelected(opt);
      onValueChange?.(opt);
      setOpen(false);
      setTimeout(() => inputRef.current?.blur(), 0);
    },
    [onValueChange, onInputValueChange]
  );

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <CommandPrimitive
        onKeyDown={handleKeyDown}
        className={styles.autoComplete}
      >
        <div className={styles.inputWrapper}>
          <PopoverTrigger asChild>
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={isLoading ? undefined : onInputValueChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={styles.customInput}
            />
          </PopoverTrigger>
        </div>

        <PopoverContent
          removeBackgroundAndPadding
          className={styles.popoverContent}
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {isLoading && (
            <div className={styles.loadingContainer}>
              <Skeleton style={{ height: "2rem" }} />
            </div>
          )}

          {options.length > 0 ? (
            <CommandList className={styles.commandList}>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={getDisplayText(option)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => handleSelectOption(option)}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          ) : (
            <div className={styles.emptyMessage}>{emptyMessage}</div>
          )}
        </PopoverContent>
      </CommandPrimitive>
    </Popover>
  );
};
