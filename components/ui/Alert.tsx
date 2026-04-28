type AlertProps = {
  message: string;
  type: "info" | "success" | "warning" | "error";
};

export default function Alert({ message, type }: AlertProps) {
  const typeStyles = {
    info: "border-blue-200 bg-blue-50 text-blue-700",
    success: "border-green-200 bg-green-50 text-green-700",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
    error: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div
      className={`rounded-md border px-4 py-3 text-sm ${typeStyles[type]}`}
      role="alert"
    >
      {message}
    </div>
  );
}
