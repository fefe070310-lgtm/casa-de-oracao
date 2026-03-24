import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Salvar o arquivo em public/uploads
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Garantir que o diretório existe
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignorar se já existe
    }

    // Criar um nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);
    console.log(`Arquivo salvo em: ${filePath}`);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ success: true, url: fileUrl }, { status: 201 });
  } catch (error: any) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro interno no upload de arquivo.', details: error.message },
      { status: 500 }
    );
  }
}
