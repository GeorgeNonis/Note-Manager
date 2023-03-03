interface Props {
  children: React.ReactNode;
  styles: CSSModuleClasses;
}

const Wrapper = ({ children, styles }: Props) => {
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>Your Note's</h3>
      {children}
    </div>
  );
};
export default Wrapper;
