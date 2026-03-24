import Link from 'next/link';
import { Instagram, Youtube, Facebook, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="block mb-6 group">
              <img 
                src="/logo.jpg" 
                alt="Casa de Oração Logo" 
                className="h-10 w-auto rounded-lg shadow-2xl transition-transform group-hover:scale-105" 
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Transformando vidas através do Reino de Deus e do amor prático ao próximo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Projetos</h3>
            <ul className="space-y-2">
              <li><Link href="/casa-de-oracao" className="text-zinc-400 hover:text-white text-sm transition-colors">Casa de Oração</Link></li>
              <li><Link href="/jump" className="text-zinc-400 hover:text-white text-sm transition-colors">Jump ONG</Link></li>
              <li><Link href="/aulas" className="text-zinc-400 hover:text-white text-sm transition-colors">Aulas e Cursos</Link></li>
              <li><Link href="/bazar" className="text-zinc-400 hover:text-white text-sm transition-colors">Bazar Solidário</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Envolva-se</h3>
            <ul className="space-y-2">
              <li><Link href="/voluntario" className="text-zinc-400 hover:text-white text-sm transition-colors">Seja Voluntário</Link></li>
              <li><Link href="/doacoes" className="text-zinc-400 hover:text-white text-sm transition-colors">Faça uma Doação</Link></li>
              <li><Link href="/pedidos-de-oracao" className="text-zinc-400 hover:text-white text-sm transition-colors">Pedidos de Oração</Link></li>
              <li><Link href="/agenda" className="text-zinc-400 hover:text-white text-sm transition-colors">Agenda</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-zinc-400 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 text-zinc-500" />
                <span>São José dos Campos, SP<br />Brasil</span>
              </li>
              <li className="flex items-center space-x-3 text-zinc-400 text-sm">
                <Mail className="w-5 h-5 flex-shrink-0 text-zinc-500" />
                <span>contato@casajump.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Casa de Oração & Jump. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacidade" className="text-zinc-500 hover:text-white text-sm transition-colors">Política de Privacidade</Link>
            <Link href="/termos" className="text-zinc-500 hover:text-white text-sm transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
