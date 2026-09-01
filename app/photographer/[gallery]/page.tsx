type GalleryPageProps = {
  params: Promise<{
    gallery: string;
  }>;
};

export default async function GalleryPage({
  params,
}: GalleryPageProps) {
  const { gallery } = await params;

  return (
    <main>
      <h1>Client Gallery</h1>
      <p>Gallery: {gallery}</p>
    </main>
  );
}