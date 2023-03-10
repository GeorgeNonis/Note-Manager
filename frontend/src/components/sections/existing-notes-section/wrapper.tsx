interface Props {
  children: React.ReactNode;
  styles: CSSModuleClasses;
}

const Wrapper = ({ children, styles }: Props) => {
  return <div className={styles.content}>{children}</div>;
};
export default Wrapper;
