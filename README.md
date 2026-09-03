# Cardápio ao vivo — protótipo v0.1

Protótipo mínimo do conceito "peça e veja o prato na hora". Nesta primeira
versão, o sistema **não gera** nenhuma imagem — ele exibe uma foto real
já cadastrada, simulando uma consulta em tempo real. É a abordagem de
**catálogo configurável** (ver seção "Roadmap").

## Como rodar

Não há build nem dependências. Basta abrir `index.html` num navegador,
ou servir a pasta com qualquer servidor estático:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Estrutura do projeto

```
prato-demo/
├── index.html          # marcação e conteúdo do card + área de preview
├── css/
│   └── style.css        # tokens de design (cor, tipografia) e layout
├── js/
│   └── script.js         # interação: clique → simula lookup → revela foto
├── assets/
│   └── prato-executivo.jpg   # foto base usada como "resultado" do pedido
└── README.md
```

## Como funciona

1. O cliente clica no card do prato.
2. `script.js` mostra uma barra de "scan" por ~500ms (efeito visual de
   busca) e então revela a imagem com um fade suave.
3. Nenhuma imagem é criada nesse processo — é sempre o mesmo arquivo em
   `assets/`, mapeado ao card clicado.

## Roadmap (fora do escopo desta versão)

- **Múltiplos pratos**: mapear cada card a uma imagem própria em `assets/`
  (um objeto `dishId → imagePath` em `script.js`).
- **Customização**: variações do pedido (ex: "sem couve") trocando a
  imagem exibida por uma variante pré-renderizada — ainda sem IA.
- **IA generativa**: versão futura poderia gerar a imagem a partir da
  descrição do pedido, mas isso troca "tempo real" por alguns segundos
  de espera e exige controle de fidelidade ao prato real (ver conversa
  anterior sobre as duas abordagens).
- **3D real**: exigiria modelagem 3D do prato e um visualizador
  WebGL/Three.js — não é possível a partir de uma única foto sem uma
  pipeline de reconstrução 3D dedicada.

## Créditos da imagem

Foto de exemplo fornecida pelo usuário como base de teste.
