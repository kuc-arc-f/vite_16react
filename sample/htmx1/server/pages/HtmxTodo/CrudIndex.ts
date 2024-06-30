import LibTurso from '../../lib/LibTurso';
//
const CrudIndex = {
  /**
  * 
  * @param
  *
  * @return
  */ 
  getList: async function() : Promise<any>
  {
    try {
      const client = await LibTurso.getClient();
      //console.log("url=", process.env.API_URL);
      const resulte = await client.execute("SELECT * FROM todos ORDER BY id desc");
//      console.log(resulte.rows);
      return resulte.rows
    } catch (error) {
      console.error(error);
      throw new Error('Error , getList');
    }
  },
}
export default CrudIndex;