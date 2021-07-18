import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu } from '../src/lib/AlurakutCommons';
import { OrkutNostalgicIconSet } from '../src/lib/OrkutNostalgicIconSet';
import { AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutProfileSidebarMenuDefault';
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
      {/* <AlurakutProfileSidebarMenuDefault/> */}
    </Box>
  )
}

function Comunidade(propriedades) { 
  const listaComunidades = propriedades.items.map((itemAtual) => {
    return (
      <li key={itemAtual.id}>
        <a href={`/communities/${itemAtual.id}`}>
          <img src={itemAtual.imageUrl} />
          <span>{itemAtual.title}</span>
        </a>
      </li>
    )
  });
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        Comunidades ({propriedades.items.length})
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

function Seguidores(propriedades) { 
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})        
      </h2>
      <ul>
        {propriedades.items.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              {console.log()}
              <a href={`https://github.com/${itemAtual.url}.png`}>
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const usuarioAleatorio = 'sol-oliveira';

  const [seguidores, setSeguidores] = React.useState([]);

  const [comunidades, setComunidades] = React.useState([]);
  
  React.useEffect(function() {
    // GET
    fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })
    
    const comunidade = [{
      id: '2202',
      title: 'Eu consigo acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    }];
    setComunidades(comunidade);

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '127f5470a069acd1a2d1245b431e81',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl          
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(respostaCompleta)
      setComunidades(comunidadesVindasDoDato)
    })

  }, [])  

  function handleComunidade(e) {
    e.preventDefault();  
    const dadosDoForm = new FormData(e.target);  
    const comunidade = {     
      title: dadosDoForm.get('title'),
      imageUrl: dadosDoForm.get('image'),
    }  

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade)
    })
      .then(async (response) => {
        const dados = await response.json();
        console.log(dados.registroCriado);
        const comunidade = dados.registroCriado;
        const comunidadesAtualizadas = [...comunidades, comunidade];
        setComunidades(comunidadesAtualizadas)
      });    
  }

  return (
    <>
      {/* <AlurakutMenu /> */}
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
          <Seguidores title="Seguidores" items={seguidores} />
          <Comunidade items={comunidades}/>
          <PessoasFavoritas githubUser={usuarioAleatorio} />
        </div>
      </MainGrid>
    </>
  )
}