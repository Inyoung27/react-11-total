import styled from "styled-components";
import { type ChangeEvent, type SubmitEvent, useEffect, useState } from "react";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
};

const Container = styled.div`
    max-width: 520px;
    margin: 0 auto;
    padding: 40px 20px;
`;

const Title = styled.h1`
    margin-bottom: 16px;
    font-size: 1.8rem;
    font-weight: 800;
    color: ${props => props.theme.primary};
`;

const Form = styled.form`
    display: flex;
    gap: 10px;
    padding: 20px;
    margin-bottom: 20px;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 16px;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px 14px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};

    &:focus {
        outline: none;
        border-color: ${props => props.theme.primary};
    }
`;

const AddButton = styled.button`
    padding: 0 18px;
    border: none;
    border-radius: 8px;
    background-color: ${props => props.theme.primary};
    color: white;
    cursor: pointer;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Item = styled.li`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 12px;
`;

// completed 값에 따라 스타일을 바꿀 때: $ 붙인 props는 DOM에 전달되지 않음
const Text = styled.span<{ $completed: boolean }>`
    flex: 1;
    color: ${props => (props.$completed ? props.theme.subText : props.theme.text)};
    text-decoration: ${props => (props.$completed ? "line-through" : "none")};
`;

const IconButton = styled.button<{ $active?: boolean; $danger?: boolean }>`
    border: none;
    background: none;
    cursor: pointer;
    color: ${props => (props.$danger ? "#e57373" : props.$active ? "#6bbf8a" : props.theme.border)};
`;

const Empty = styled.p`
    text-align: center;
    padding: 30px;
    color: ${props => props.theme.subText};
`;

function Todo() {
    const [todoList, setTodoList] = useState<TodoItem[]>(() => {
        const saved = localStorage.getItem("todoList");
        return saved ? (JSON.parse(saved) as TodoItem[]) : [];
    });
    const [todoValue, setTodoValue] = useState("");

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoValue(event.target.value);
    };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newText = todoValue.trim();
        if (newText === "") return;

        setTodoList([...todoList, { id: Date.now(), text: newText, completed: false }]);
        setTodoValue("");
    };

    const handleDelete = (id: number) => {
        setTodoList(todoList.filter(item => item.id !== id));
    };

    const handleToggle = (id: number) => {
        setTodoList(
            todoList.map(item => (item.id === id ? {...item, completed: !item.completed } : item))
        );
    }

    return (
        <Container>
            <Title>Todo List</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type={"text"}
                    placeholder={"오늘의 할 일을 입력하세요"}
                    onChange={handleChange}
                    value={todoValue}
                />
                <AddButton type={"submit"}>
                    <FaPlus />
                </AddButton>
            </Form>

            <List>
                {todoList.length === 0 && <Empty>할 일이 없어요.</Empty>}
                {todoList.map(item => (
                    <Item key={item.id}>
                        <IconButton $active={item.completed} onClick={() => handleToggle(item.id)}>
                            <FaCheck />
                        </IconButton>
                        <Text $completed={item.completed}>{item.text}</Text>
                        <IconButton $danger onClick={() => handleDelete(item.id)}>
                            <FaTrash />
                        </IconButton>
                    </Item>
                ))}
            </List>
        </Container>
    );
}

export default Todo;
