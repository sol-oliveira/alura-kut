import { SiteClient } from 'datocms-client';

export default async function getFilteredRecords(request, response) {
    const TOKEN = '127f5470a069acd1a2d1245b431e81';
    const client = new SiteClient(TOKEN);
    const data = await client.items.all({
      filter: {
        type: "community",
        fields: {
            ...request.body,
        },
      },
    });
    response.json({
        data: data
    })
    return;  
}
 