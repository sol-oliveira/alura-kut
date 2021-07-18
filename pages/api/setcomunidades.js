import { SiteClient } from 'datocms-client';

export default async function createRecord(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '2b9a78e394bae10a93b557e9742fb8';
        const client = new SiteClient(TOKEN);        
        const dado  = await client.items.create({
            itemType: "976437", // ID do Model de "Communities" criado pelo Dato
            ...request.body,                      
        }); 
        response.json({
          dado : dado ,
        })       
        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}



