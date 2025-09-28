import styles from "./Divider.module.css";

export default function Divider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <div className={styles.checkerboard} />
    </div>
  );
}
