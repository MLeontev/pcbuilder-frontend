interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  if (!props.message) return null;
  return <div style={{ color: 'red' }}>{props.message}</div>;
}
