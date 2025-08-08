export default function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-900">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6 text-zinc-400 text-sm">
        
        {/* Imágenes de confianza en columna y a tamaño completo */}
        <div className="flex flex-col w-full gap-4">
          <img src="/images/confianza-1.png" alt="Sello de seguridad" className="w-full h-auto" />
          <img src="/images/confianza-2.png" alt="Pago seguro" className="w-full h-auto" />
        </div>

        {/* Texto de derechos */}
        <div className="text-center w-full">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
