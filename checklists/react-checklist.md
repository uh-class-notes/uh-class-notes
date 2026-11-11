# React Checklist

Best practices for the React UI framework.

### RE-01: Keep components focused.

Each component should have a clear responsibility. Split components that have unrelated responsibilities.

### RE-02: Avoid state updates in loops.

Review loops that update component state; batch updates where appropriate.

### RE-03: Keep component names consistent.

Name a component consistently with its file, and use that name when importing it.

### RE-04: Destructure props when it improves clarity.

Use the component signature to make the props it consumes clear.

### RE-05: Prefer function components.

Use function components unless a class is needed for a specific React feature.
