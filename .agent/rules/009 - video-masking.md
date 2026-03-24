---
description: Regra rigorosa para mascarar vídeos do YouTube/Vimeo nas aulas e cursos da plataforma
---

# Regra: Máscara Obrigatória para Vídeos (White-Label)

Todo vídeo embedado ou originado de plataformas externas (YouTube, Vimeo, etc), especialmente em páginas de "aulas" e "cursos", deve obrigatoriamente ser mascarado para aparentar ser um player nativo da plataforma.

⚠️ **NUNCA use tags `<iframe>` normais com o link padrão do YouTube.**

## Protocolo de Implementação:

1. **Uso de Player Customizado (`Plyr`)**: 
   Todo vídeo deve ser reproduzido através do componente encapsulador `VideoPlayer` (ou biblioteca Plyr) invés de iframe cru.
   
2. **Parâmetros de Ocultação do YouTube**:
   Se for obrigatório usar os parâmetros embed da URL do YouTube, certifique-se de configurar:
   - `modestbranding=1` (Esconde a logotipo do YT)
   - `showinfo=0` (Oculta título)
   - `rel=0` (Limita vídeos recomendados ao próprio canal)
   - `controls=0` (Dificulta a interação nativa do YouTube e aplica controles próprios do Plyr)
   - `iv_load_policy=3` (Esconde anotações)

3. **Injeção de CSS / Controles Próprios**:
   Assegure-se de que a paleta de cores do player e os botões tenham as cores da nossa marca (ex: vermelho `#ef4444`). A experiência do usuário não deve apresentar nenhum indício forte ou recomendação que o leve a sair do curso e navegar no YouTube.
