interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  if (!props.message) return null;
  return <div className='text-red-500 font-semibold'>{props.message}</div>;
}
