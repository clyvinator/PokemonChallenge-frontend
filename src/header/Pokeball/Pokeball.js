/*Creates the pokemon logo displayed on the header*/

import styles from "./pokeball.module.css";

const Pokeball = () => {
  return (
    <div id={styles.outerDiv}>
      <div id={styles.line}></div>
      <div id={styles.innerDiv}></div>
    </div>
  );
};

export default Pokeball;
