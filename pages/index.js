import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu } from '../src/lib/AlurakutCommons';
import { OrkutNostalgicIconSet } from '../src/lib/OrkutNostalgicIconSet'
import { AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutProfileSidebarMenuDefault'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {

  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function Comunidade() {

  const [comunidades, setComunidades] = React.useState([{
    id: '2202',
    title: 'Eu sou minha comunidade',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const listaComunidades = comunidades.map((itemAtual) => {
    return (
      <li key={itemAtual.id}>
        <a href={`/users/${itemAtual.title}`}>
          <img src={itemAtual.image} />
          <span>{itemAtual.title}</span>
        </a>
      </li>
    )
  });
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        Comunidades ({comunidades.length})
      </h2>
      <ul>{listaComunidades}</ul>
    </ProfileRelationsBoxWrapper>
  )
}

function PessoasFavoritas(propriedades) {

  const pessoasFavoritas = [];

  for (let i = 0; i <= 5; i++) {
    pessoasFavoritas.push(propriedades.githubUser);
  }

  const listaPessoasFavoritas = pessoasFavoritas.map((itemAtual) => {
    return (
      <li key={itemAtual}>
        <a href={`/users/${itemAtual}`}>
          <img src={`https://github.com/${itemAtual}.png`} />
          <span>{itemAtual}</span>
        </a>
      </li>
    )
  });
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        Pessoas da comunidade ({pessoasFavoritas.length})
      </h2>
      <ul>{listaPessoasFavoritas}</ul>
    </ProfileRelationsBoxWrapper>
  )
}

function handleComunidade(e) {

  e.preventDefault();

  const dadosDoForm = new FormData(e.target);

  const comunidade = {
    id: new Date().toISOString(),
    title: dadosDoForm.get('title'),
    image: dadosDoForm.get('image'),
  }

  //const comunidadesAtualizadas = [...comunidades, comunidade]; 
  // setComunidades(comunidadesAtualizadas);

}

export default function Home() {

  const usuarioAleatorio = 'sol-oliveira';

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleComunidade}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <Comunidade />
          <PessoasFavoritas githubUser={usuarioAleatorio} />
        </div>
      </MainGrid>
    </>
  )
}