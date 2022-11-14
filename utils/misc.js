module.exports = {
     capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    wait(ms) {
      return new Promise(r => setTimeout(r, ms));
  },
  getRoleByName(guild, name){
      return guild.roles.cache.find(role => role.name === name)
  },
  getRoleBySTRID(guild, id){
      return guild.roles.cache.find(role => role.id.toString() === id)
  },
  getRealName(client, name){
      name = name.replace(/ *\[[^)]*\] */g, "");
      for (const [key, value] of Object.entries(client.nicknamesDict))
      {
          if(name == key)
          {
              name = value;
              break
          }
      }
      return name
  },
  getConnectedRealms(client, realm){
      realm = realm.trim()
      for(connections of client.connectedRealms)
      {
          if(connections.includes(realm))
          {
              return connections.join(", ");
          }
      }
      return `Could not found ${realm} in realm list.\nIf the realm contains spaces, make sure to include them.`
  }
}
