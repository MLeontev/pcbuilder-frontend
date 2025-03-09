interface SubmitButtonProps {
  disabled?: boolean;
  text: string;
}

export default function SubmitButton(props: SubmitButtonProps) {
  return (
    <button
      type='submit'
      disabled={props.disabled}
      className='mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
    >
      {props.text}
    </button>
  );
}
