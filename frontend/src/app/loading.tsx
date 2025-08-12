export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Memuat...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Mohon tunggu sebentar
        </p>
      </div>
    </div>
  );
}
