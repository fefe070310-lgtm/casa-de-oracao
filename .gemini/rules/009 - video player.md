
# Video Player — YouTube Masking Rule

## Regra Principal

Todos os vídeos do YouTube exibidos na plataforma **DEVEM** ser totalmente mascarados para parecer que são nativos do sistema "Casa Jump Player". **Nenhum elemento de branding do YouTube pode ser visível** em nenhum momento — nem ao pausar, nem ao passar o mouse, nem ao terminar o vídeo.

## Implementação Obrigatória

1. **Usar YouTube IFrame Player API** (não Plyr, não iframe direto) — com `controls: 0` para esconder controles nativos do YouTube
2. **Controles 100% customizados** — Play/Pause, barra de progresso, volume, velocidade e fullscreen construídos em React
3. **CSS agressivo** para esconder todos os elementos do YouTube:
   - `.ytp-watermark` (logo marca d'água)
   - `.ytp-youtube-button` (botão do YouTube)
   - `.ytp-impression-link` ("Assistir no YouTube")
   - `.ytp-chrome-top` (título / info do canal)
   - `.ytp-pause-overlay` (overlay de pausa com logo)
   - `.ytp-endscreen-content` / `.ytp-ce-*` (tela final com sugestões)
   - `.ytp-large-play-button` (botão grande de play do YT)
   - `.ytp-cued-thumbnail-overlay` (overlay da thumbnail)
4. **Branding próprio**: Exibir "CASA JUMP PLAYER" com ícone PlayCircle no canto superior esquerdo
5. **Camada de clique** acima do iframe para interceptar play/pause (evita que o YouTube mostre seus elementos ao clicar)
6. **O iframe deve ter `pointer-events: none`** — toda interação passa pelo layer React

## Parâmetros do YouTube Obrigatórios

```typescript
playerVars: {
  controls: 0,       // Sem controles nativos
  disablekb: 1,      // Sem atalhos do YouTube
  fs: 0,             // Sem botão fullscreen nativo
  iv_load_policy: 3, // Sem anotações
  modestbranding: 1, // Branding mínimo
  rel: 0,            // Sem vídeos relacionados
  showinfo: 0,       // Sem informações
  playsinline: 1,    // Inline no mobile
  cc_load_policy: 0, // Sem legendas automáticas
}
```

## Componente de Referência

O componente oficial está em `components/video-player.tsx`. Qualquer novo player de vídeo **DEVE** seguir esse padrão.

## Proibições

- ❌ **NUNCA** usar iframe direto do YouTube com controles visíveis
- ❌ **NUNCA** usar Plyr ou qualquer wrapper que não esconda completamente o branding
- ❌ **NUNCA** deixar aparecer o logo do YouTube ao pausar, iniciar ou finalizar
- ❌ **NUNCA** mostrar "Assistir no YouTube" ou links para o YouTube
- ❌ **NUNCA** exibir vídeos relacionados/sugeridos do YouTube ao final
