import styles from "./Pokeball.module.css";

const Pokeball = () => {
  return (
    <>
      <div id={styles.outerDiv}>
        <div id={styles.line}></div>
        <div id={styles.innerDiv}></div>
      </div>
    </>
  );
};

export default Pokeball;