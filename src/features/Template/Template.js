import styles from "./Template.module.css";

function Template() {
  const f = (a, b) => {
    const c = a ** b;
    return c;
  };

  return (
    <div className={styles["stage"]}>{f(1, 2) + " - this is a template"}</div>
  );
}

export default Template;
