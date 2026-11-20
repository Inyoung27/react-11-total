import { type ChangeEvent, type SubmitEvent, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
    keyword: string;
    placeholder: string;
    onSearch: (keyword: string) => void;
};

const Form = styled.form`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`;

const Input = styled.input`
    flex: 1;
    padding: 14px 16px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 10px;
    background-color: ${props => props.theme.card};
    color: ${props => props.theme.text};

    &:focus {
        outline: none;
        border-color: ${props => props.theme.primary};
    }
`;

const Button = styled.button`
    padding: 0 20px;
    border: none;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: white;
    cursor: pointer;
`;

function SearchBar({ keyword, placeholder, onSearch }: SearchBarProps) {
    const [value, setValue] = useState(keyword);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = value.trim();
        if (trimmed === "") return;
        onSearch(trimmed);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input placeholder={placeholder} value={value} onChange={handleChange} />
            <Button type="submit">
                <FaSearch />
            </Button>
        </Form>
    );
}

export default SearchBar;
