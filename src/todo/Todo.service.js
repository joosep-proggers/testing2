import { useCallback, useState } from "react";
import { injectableHook } from "../_common/inject";

const TodoService = () => {
  const [items, setItems] = useState([]);

  const addItem = useCallback(
    () =>
      setItems((prevItems) => {
        const lastItem = prevItems[prevItems.length - 1];

        if (lastItem && lastItem.label.length === 0) {
          return prevItems;
        }

        return [...prevItems, { id: Date.now(), label: "", isDone: false }];
      }),
    []
  );

  const editItem = useCallback(
    (id, newItem) =>
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id !== id ? item : { ...item, ...newItem }
        )
      ),
    []
  );

  const deleteItem = useCallback(
    (id) => setItems((prevItems) => prevItems.filter((item) => item.id !== id)),
    []
  );

  return { items, addItem, editItem, deleteItem };
};

export const useTodoService = injectableHook(TodoService);
