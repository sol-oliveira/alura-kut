import Box from '../ProfileSidebar';
export function ProfileSidebar (propriedades) {
    return (
      <Box>
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      </Box>
    )
  }
