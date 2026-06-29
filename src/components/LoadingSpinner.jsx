export default function LoadingSpinner({ fullHeight = true }) {
  return (
    <div className={`flex items-center justify-center ${fullHeight ? 'min-h-[60vh]' : 'py-8'}`}>
      <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
    </div>
  );
}
