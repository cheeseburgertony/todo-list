import { memo, useState, useEffect } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounceFn } from "ahooks";
import "./index.less";

interface ISearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBox = memo(
  ({
    value,
    onChange,
    placeholder = "搜索任务标题或描述...",
  }: ISearchBoxProps) => {
    const [inputValue, setInputValue] = useState(value);

    const { run: debouncedSearch } = useDebounceFn(
      (newValue: string) => {
        onChange(newValue);
      },
      { wait: 300 }
    );

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      debouncedSearch(newValue);
    };

    return (
      <div className="search-box">
        <Input
          size="large"
          placeholder={placeholder}
          prefix={<SearchOutlined />}
          value={inputValue}
          onChange={handleChange}
          allowClear
          onClear={() => {
            setInputValue("");
            onChange("");
          }}
        />
      </div>
    );
  }
);

export default SearchBox;
