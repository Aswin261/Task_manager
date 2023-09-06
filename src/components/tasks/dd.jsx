import { useDrag } from "react-dnd";

function Task(props) {
  const [{ isDragging }, drag] = useDrag({
    item: { id: props.id, type: "task" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {props.title}
    </div>
  );
}
export default Task;
