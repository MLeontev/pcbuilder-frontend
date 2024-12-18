interface SubmitButtonProps {
  disabled?: boolean;
  text: string;
}

export default function SubmitButton(props: SubmitButtonProps) {
  return (
    <button type='submit' disabled={props.disabled}>
      {props.text}
    </button>
  );
}
