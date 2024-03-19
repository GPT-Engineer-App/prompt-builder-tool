import { useState } from "react";

const Index = () => {
  const [components, setComponents] = useState([
    { id: "comp1", content: "Component 1" },
    { id: "comp2", content: "Component 2" },
  ]);
  let draggableComponent = null;

  const handleDragStart = (e, component) => {
    draggableComponent = component;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = (e) => {
    const newComponents = Array.from(components);
    const draggedComponentIndex = newComponents.findIndex((comp) => comp.id === draggableComponent.id);
    const targetComponentIndex = newComponents.findIndex((comp) => comp.id === e.target.id);
    newComponents.splice(draggedComponentIndex, 1);
    newComponents.splice(targetComponentIndex, 0, draggableComponent);

    setComponents(newComponents);
    draggableComponent = null;
  };

  return (
    <div>
      {components.map((component, index) => (
        <div key={component.id} id={component.id} draggable onDragStart={(e) => handleDragStart(e, component)} onDragOver={handleDragOver} onDragEnd={handleDragEnd} style={{ border: "1px solid black", margin: "8px", padding: "4px" }}>
          {component.content}
        </div>
      ))}
    </div>
  );
};

export default Index;
