interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const Container = ({ className, children }: Props) => {
  return (
    <div className={`container mx-auto px-4 h-full ${className}`}>
        {children}
    </div>
  );
};