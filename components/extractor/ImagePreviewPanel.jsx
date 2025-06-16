import Image from 'next/image';

export default function ImagePreviewPanel() {
  return (
    <div className="w-1/2 p-4 flex items-center justify-center bg-white rounded-lg shadow-md">
      {/* We gebruiken hier een placeholder afbeelding. Later kunnen we dit dynamisch maken. */}
      <Image
        src="/images/packaging/plastic-food-tub.jpg" // Zorg ervoor dat je een afbeelding hebt op dit pad in je `public` map
        alt="Product Preview"
        width={400}
        height={400}
        className="object-contain"
      />
    </div>
  );
}