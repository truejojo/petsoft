const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-red-500 text-sm'>{children}</p>;
};

export default ErrorMessage;
