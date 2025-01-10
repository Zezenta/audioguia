const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 5000;

const API_KEY = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'geoecuador.site')));
//app.use(express.static(path.join(__dirname, 'public_html/geoecuador.site')));

app.post('/api/chat', (req, res) => {
  const { question } = req.body;
  console.log(req.body);

  const data = { //AQUI ESTA TODOAQUI ESTA TODOAQUI ESTA TODOAQUI ESTA TODOAQUI ESTA TODOAQUI ESTA TODOAQUI ESTA TODO
    model: "gpt-4o-mini",  // Change to "gpt-4" if you have access
    messages: [{role:"system", content: `Tu nombre es GeoBot, eres un experto en geología con una lista de formaciones geológicas del Ecuador, a cualquier pregunta que no tenga tanto que ver con geología, dile que no la puedes ayudar con eso, ya que tu área de expertís es geología. A las preguntas sobre las formaciones en Ecuador, respóndelas en una sola frase, y de manera breve. No uses lenguaje MarkDown, solo lenguaje natural. Si te preguntan sobre una formación cuyo nombre se repite 2 veces en 2 formaciones o más, proporciona información sobre ambas. Si el usuario no te hace ninguna pregunta, dile que tu nombre es GeoBot y que lo puedes ayudar con preguntas como "Háblame sobre la formación Yunguilla". Básate en la siguiente tabla CSV:
Era,Período/Época,Ubicación,Tipo,Nombre,Litología,Qué es / Cuál es
Cenozoico,Cuaternario,Costa,Depósitos cuaternarios,Terrazas marinas costeras,Arcillas marinas de estuario,
Cenozoico,Cuaternario,Costa,Depósitos cuaternarios,Llanuras aluviales,"Arcillas, limos y arenas",
Cenozoico,Cuaternario,Costa,Depósitos cuaternarios,Abanico aluvial,Cantos rodados polilíticos en matriz areno-limo-arcillosa,
Cenozoico,Pleistoceno,Costa,Formación,Pichilingue,"Terrazas, sedimentos fluviales",
Cenozoico,Plioceno,Costa,Formación,San Tadeo,"Abanico volcánico, lahares",
Cenozoico,Pleistoceno,Costa,Formación,Tablazo,Terrazas marinas bioclásticas,
Cenozoico,Plioceno,Costa,Formación,Balzar,"Arenas, conglomerados y arcillas",
Cenozoico,Plioceno,Costa,Formación,Puná,"Lutitas, arcillas y arenas",
Cenozoico,Plioceno,Costa,Formación,Borbón,Areniscas tobáceas,
Cenozoico,Mioceno,Costa,Formación,Onzole,"Lutitas, limolitas.",
Cenozoico,Mioceno,Costa,Formación,Angostura,"Coquinas, areniscas, lodolitas.",
Cenozoico,Mioceno,Costa,Formación,Viche,"Lutitas, areniscas.",
Cenozoico,Mioceno,Costa,Formación,Quebrada Seca,"Areniscas, conglomerados y limolitas.",
Cenozoico,Mioceno,Costa,Formación,Progreso,"Areniscas, limolitas y lutitas.",
Cenozoico,Mioceno,Costa,Formación,Subibaja,Limolitas calcáreas.,
Cenozoico,Mioceno,Costa,Formación,Villingota,Lutitas y areniscas,
Cenozoico,Mioceno/Oligoceno,Costa,Formación,Dos Bocas,Lutitas y lodolitas,
Cenozoico,Oligoceno,Costa,Formación,Pambil,Arenas finas y lodolitas,
Cenozoico,Oligoceno,Costa,Formación,Playa Rica,"Lutitas, areniscas.",
Cenozoico,Oligoceno,Costa,Formación,Zapotal,"Conglomerados, areniscas tobáceas y lutitas.",
Cenozoico,Eoceno,Costa,Formación,Zapallo,"Conglomerados, areniscas y lutitas.",
Cenozoico,Eoceno,Costa,Formación,San Mateo,Areniscas y conglomerados,
Cenozoico,Eoceno,Costa,Formación,Punta Ostiones,Calizas y lodolitas,
Cenozoico,Eoceno,Costa,Formación,San Eduardo,Calizas y lutitas,
Cenozoico,Eoceno,Costa,Grupo,Ancón,"Turbiditas, lutitas",Reservorios del Golfo
Cenozoico,Paleoceno,Costa,Grupo,Azúcar,"Lutitas, areniscas y conglomerados",Reservorios del Golfo
Mesozoico,Cretácico,Costa,Formación,Guayaquil,Lutitas silíceas,
Mesozoico,Cretácico,Costa,Formación,Cayo,"Grauvacas, lutitas y mantos basálticos.",
Mesozoico,Cretácico,Costa,Formación,Piñón,"Lavas basálticas, tobas y brechas",Basamento de la costa
Cenozoico,Cuaternario,Cordillera Occidental,Depósitos cuaternarios,Depósitos coluviales Cordillera Occidental,"Fragmentos angulosos gravas, arenas y limos",
Cenozoico,Cuaternario,Cordillera Occidental,Volcánicos,Volcánicos Cotopaxi,"Dos facies.  Facie distal: piroclastos primarios, avalanchas de escombros, lahares y flujos de lava.  Facie proximal: Estratovolcanes y domos, lavas dacíticas a andesíticas y piroclastos.",
Cenozoico,Plioceno,Cordillera Occidental,Unidad,El Fundo,"Conglomerados, tobas retrabajada, areniscas, limolitas y lutitas.",
Cenozoico,Plioceno,Cordillera Occidental,Volcánicos,Volcánicos Pisayambo,Flujos de lava y piroclastos,
Cenozoico,Plioceno,Cordillera Occidental,Volcánicos,Volcánicos Tarqui,Depósitos piroclásticos de caída de composición intermedia a ácida.,
Cenozoico,Mioceno,Cordillera Occidental,Volcánicos,Volcánicos Zumbagua,Piroclastos y lavas intermedias a ácidas.,
Cenozoico,Mioceno,Cordillera Occidental,Formación,Jubones,Flujos piroclásticos riodacíticos a riolíticos.,
Cenozoico,Oligoceno,Cordillera Occidental,Unidad,San Juan de Lachas,Lavas andesíticas y brechas volcánicas,
Cenozoico,Eoceno,Cordillera Occidental,Volcánicos,Saraguro,Rocas piroclásticas y lavas andesíticas a riolíticas,
Cenozoico,Eoceno,Cordillera Occidental,Unidad,Silante,"Volcanoclastos, capas rojas, conglomerados y areniscas.",
Cenozoico,Eoceno,Cordillera Occidental,Sedimentos,Apagua,Lutitas y grauvacas.,
Cenozoico,Eoceno,Cordillera Occidental,Formación,Unacota,Calizas y lutitas.,
Cenozoico,Paleoceno,Cordillera Occidental,Grupo,Angamarca,"Areniscas turbidíticas, limolitas y lutitas.",
Cenozoico,Paleoceno,Cordillera Occidental,Unidad,Arrayanes,"Areniscas volcánicas, lutitas y lavas.",
Cenozoico,Paleoceno,Cordillera Occidental,Formación,Macuchi,Volcanosedimendtos y lavas basálticas.,"Arco de islas subaéreo del bloque Piñón, relacionado al plateau oceánico"
Mesozoico,Cretácico,Cordillera Occidental,Formación,Yunguilla,"Lutitas, calizas y volcanoclastos.",
Mesozoico,Cretácico,Cordillera Occidental,Grupo,Pilatón,"Limolitas, areniscas y brechas.",
Mesozoico,Cretácico,Cordillera Occidental,Volcánicos,Río Cala,Lavas básicas y volcanosedimentos.,"Arco de islas, relacionado al plateau oceánico"
Mesozoico,Cretácico,Cordillera Occidental,Ofiolitas,San Juan,Rocas básicas a ultrabásicas.,
Cenozoico,Cuaternario,Valle Interandino,Volcánicos,Cotopaxi,"Tres facies.  Facie distal: piroclastos retrabajados y primarios, avalanchas de escombros y lahares.  Facie volcanosedimentaria: Areniscas tobáceas, conglomerados, diatomidas. Facie proximal: Estratovolcanes de lavas andesíticas y piroclastos.",
Cenozoico,Plioceno,Valle Interandino,Grupo,Chota,"Areniscas, lutitas y conglomerados.",Cuenca Chota
Cenozoico,Plioceno,Valle Interandino,Volcánicos,Pisayambo,Andesitas a riolitas y piroclastos.,
Cenozoico,Mioceno,Valle Interandino,Grupo,Turi / Azogues,"Tobas, areniscas y conglomerados.  Arcillas, areniscas y lavas.",Cuenca Girón Santa Isabel
Cenozoico,Eoceno,Valle Interandino,Volcánicos,Saraguro,Rocas piroclásticas y lavas andesíticas a riolíticas,
Cenozoico,Paleoceno,Valle Interandino,Volcánicos,Sacapalca,Lavas andesíticas y volcanosedimentos.,
Mesozoico,Jurásico,Valle Interandino,Unidad,Guasuntos,Pizarras y cuarcitas,Relacionado a Guamote
Cenozoico,Cuaternario,Cordillera Real,Depósitos cuaternarios,Depósito Coluvial de Cordillera Real,"Fragmentos angulosos gravas, arenas y limos",
Cenozoico,Cuaternario,Cordillera Real,Depósitos cuaternarios,Depósito Glaciar de Cordillera  Real,Bloques erráticos y tillitas.,
Cenozoico,Plioceno,Cordillera Real,Volcánicos,Cotopaxi,"Dos facies.  Facie distal: piroclastos primarios y retrabajados, avalanchas de escombros.  Facie proximal: Estratovolcanes y domos, lavas dacíticas a andesíticas y piroclastos.",
Cenozoico,Plioceno,Cordillera Real,Volcánicos,Pisayambo,Andesitas a riolitas y piroclastos.,
Cenozoico,Plioceno,Cordillera Real,Grupo,Nabón,"Arcillas, tobas y areniscas",Cuenca Nabón
Cenozoico,Plioceno,Cordillera Real,Grupo,"Quillollaco, Sedimentos Catamayo","Lahares, conglomerados y flujos de brechas, lutitas y areniscas.",Cuenca Catamayo
Cenozoico,Plioceno,Cordillera Real,Grupo,"Quillollaco, Sedimentos Malacatos","Conglomerados, tobas y areniscas, calizas y lutitas.",
Cenozoico,Plioceno,Cordillera Real,Grupo,"Quillollaco, Sedimentos Loja","Conglomerados y areniscas; lutitas, areniscas y tobas.",
Cenozoico,Mioceno,Cordillera Real,Sedimentos,Zumba,"Conglomerados,  brechas, tobas, limolitas y lutitas.",Cuenca Zumba
Cenozoico,Mioceno,Cordillera Real,Formación,Gonzanamá,"Areniscas, calizas, limolitas y brechas.",Cuenca Gonzanamá
Cenozoico,Eoceno,Cordillera Real,Volcánicos,Saraguro,Rocas piroclásticas y lavas andesíticas a riolíticas,
Mesozoico,Jurásico,Cordillera Real,Unidad,Peltetec,Serpentinitas y basaltos,Terreno Alao
Mesozoico,Jurásico,Cordillera Real,Unidad,El Pan,Esquistos grafitosos.,Terreno Alao
Mesozoico,Jurásico,Cordillera Real,Unidad,Maguazo,Metagrauvacas y metalavas.,Terreno Alao
Mesozoico,Jurásico,Cordillera Real,Unidad,Alao-Paute,Metalavas básicas y esquistos verdes,Terreno Alao
Mesozoico,Jurásico,Cordillera Real,Unidad,Cuyuja,"Esquistos pelíticos y grafíticos, paragneises.",Terreno Salado
Mesozoico,Jurásico,Cordillera Real,Unidad,Cerro Hermoso,Mármol y pizarras,Terreno Salado
Mesozoico,Jurásico,Cordillera Real,Unidad,Upano,"Esquistos, metalavas y metagrauvacas.",Terreno Salado
Mesozoico,Jurásico,Cordillera Real,Unidad,Tapala,Rocas siliciclásticas y calizas.,Terreno Salado
Mesozoico,Jurásico,Cordillera Real,Unidad,Pucarón,"Filitas, esquistos y metaareniscas.",Terreno Salado
Mesozoico,Triásico,Cordillera Real,Unidad,Quebrada El Volcán,"Andesitas, aglomerados y tobas.",Terreno Loja
Mesozoico,Triásico,Cordillera Real,Unidad,Monte Olivo,Anfibolitas y esquistos anfibólicos.,Terreno Loja
Mesozoico,Triásico,Cordillera Real,Unidad,Tres Lagunas,"Gneises, granitos deformados y esquistos.",Terreno Loja
Mesozoico,Triásico,Cordillera Real,Unidad,Sabanilla,Migmatitas y gneises.,Terreno Loja
Paleozoico,Devónico,Cordillera Real,Unidad,Huacapamba,Esquistos y filitas con cloritoide.,Terreno Loja
Paleozoico,Devónico,Cordillera Real,Unidad,Chigüinda,Filitas y cuarcitas.,Terreno Loja
Paleozoico,Devónico,Cordillera Real,Unidad,Agoyán,Esquistos y gneises semipelíticos.,Terreno Loja
Cenozoico,Cuaternario,Cuenca Oriente,Depósitos cuaternarios,Depósitos Aluviales de Cuenca Oriente,"Bloques, cantos rodados y arenas.",
Cenozoico,Cuaternario,Cuenca Oriente,Depósitos cuaternarios,Terrazas aluviales de Cuenca Oriente,"Arcillas, limos y arenas",
Cenozoico,Cuaternario,Cuenca Oriente,Volcánicos,Sumaco,Estratovolcanes de lavas basálticas alcalinas; escombros de avalanchas.,
Cenozoico,Plioceno,Cuenca Oriente,Formación,Mera,"Terrazas: Conglomerados, arenas y lutitas.",
Cenozoico,Plioceno,Cuenca Oriente,Formación,Chambira,"Areniscas, lutitas, tobas.",
Cenozoico,Mioceno,Cuenca Oriente,Formación,Curaray,"Arcillas, lutitas tobáceas y yeso.",
Cenozoico,Oligoceno,Cuenca Oriente,Formación,Chalcana,Lutitas y yeso.,
Cenozoico,Paleoceno,Cuenca Oriente,Formación,Tiyuyacu,Conglomerados y areniscas.,
Mesozoico,Cretácico,Cuenca Oriente,Formación,Tena,Lutitas y capas rojas.,Roca sello de la Cuenca Oriente
Mesozoico,Cretácico,Cuenca Oriente,Formación,Napo,"Areniscas, calizas y lutitas.",Reservorios de la Cuenca Oriente
Mesozoico,Cretácico,Cuenca Oriente,Formación,Hollín,Areniscas y cuarcitas.,Reservorios de la Cuenca Oriente
Mesozoico,Cretácico,Bloque Amotape Tahuín,Formación,Cazaderos,Lutitas negras y areniscas.,
Mesozoico,Cretácico,Bloque Amotape Tahuín,Formación,Puyango,"Calizas, lutitas calcáreas.",
Mesozoico,Cretácico,Bloque Amotape Tahuín,Formación,Quebrada Los Zábalos,"Areniscas, conglomerados, grauvacas y lutitas.",
Mesozoico,Cretácico,Bloque Amotape Tahuín,Formación,Río Panupali,Esquistos verdes,Complejo Raspas
Mesozoico,Cretácico,Bloque Amotape Tahuín,Unidad,El Toro,Harzburgitas y serpentinitas,Complejo Raspas
Mesozoico,Cretácico,Bloque Amotape Tahuín,Unidad,La Chilca,"Esquistos con granate, esquistos verdes y eclogitas.",Complejo Raspas
Mesozoico,Jurásico,Bloque Amotape Tahuín,División,Melange Palenque,"Cuarcitas, filitas y esquistos.",
Mesozoico,Jurásico,Cuenca Oriente,Formación,Chapiza,Capas rojas y lutitas.,
Mesozoico,Jurásico,Cuenca Oriente,Unidad,La Saquea,Andesitas y brechas volcánicas.,
Mesozoico,Jurásico,Cuenca Oriente,Unidad,Nueva Esperanza,"Tobas, ignimbritas y areniscas volcánicas.",
Mesozoico,Jurásico,Cuenca Oriente,Unidad,Suárez,Conglomerados polimícticos,
Mesozoico,Jurásico,Cuenca Oriente,Formación,Misahuallí,Lavas y piroclásticos andesíticos.,
Mesozoico,Jurásico,Cuenca Oriente,Formación,Santiago,"Calizas, lutitas, areniscas.",
Mesozoico,Jurásico,Cuenca Oriente,Unidad,Yacuambi,"Metalavas, limolitas y lutitas.",
Mesozoico,Triásico,Cuenca Oriente,Unidad,Piuntza,Volcanosedimentos y tobas silicificadas.,
Mesozoico,Triásico,Cuenca Oriente,Unidad,Pachicutza,"Lavas básicas, brechas volcánicas, tobas y conglomerados",
Paleozoico,Carbonífero,Cuenca Oriente,Formación,Macuma,"Calizas bioclásticas, areniscas y lutitas.",Vulcanismo jurásico
Paleozoico,Carbonífero,Cuenca Oriente,Formación,Pumbuiza,Pizarras y filitas.,Vulcanismo jurásico
Precámbrico,Precámbrico,Cuenca Oriente,Unidad,Plan del Oso,"Gneises, esquistos y granulitas.",
Mesozoico,Triásico,Bloque Amotape Tahuín,Unidad,Limón Playa,Gneises graníticos y granodioríticas.,Complejo Moromoro
Mesozoico,Triásico,Bloque Amotape Tahuín,Unidad,Quera Chico,Granodioritas y migmatitas.,Complejo Moromoro
Mesozoico,Triásico,Bloque Amotape Tahuín,Unidad,La Bocana,"Granodioritas, migmaticas y paragneises.",Complejo Moromoro
Mesozoico,Triásico,Bloque Amotape Tahuín,Unidad,Taqui,Anfibolitas de grano fino.,Grupo Ofiolótico Piedras
Mesozoico,Triásico,Bloque Amotape Tahuín,Unidad,Arenillas,Anfibolitas y esquistos verdes.,Grupo Ofiolótico Piedras
Mesozoico,Triásico,Bloque Amotape Tahuín,Unidad,Quebrada Plata,"Anfibolitas, esquistos verdes y serpentinitas.",Grupo Ofiolótico Piedras
Paleozoico,Carbonífero,Bloque Amotape Tahuín,Unidad,La Victoria,"Filitas, esquistos y gneises.",Grupo Tahuín
Paleozoico,Carbonífero,Bloque Amotape Tahuín,Unidad,El Tigre,"Grauvacas, areniscas y lutitas",Grupo Tahuín
Cenozoico,Mioceno,Cuenca Alamor Lancones,Formación,Río Playas,Conglomerados y areniscas,
Mesozoico,Cretácico,Cuenca Alamor Lancones,Grupo,Zapotillo,"Areniscas, lutitas y grauvacas.",
Mesozoico,Cretácico,Cuenca Alamor Lancones,Unidad,Casanga,"Conglomerados, areniscas y limolitas.",
Mesozoico,Cretácico,Cuenca Alamor Lancones,Unidad,Naranjo,Areniscas y limolitas,
Mesozoico,Cretácico,Cuenca Alamor Lancones,Formación,Ciano,"Areniscas volcánicas, limolitas y lutitas",
Mesozoico,Cretácico,Cuenca Alamor Lancones,Unidad,Iguinda,"Lutitas calcáreas, limolitas y areniscas",
Mesozoico,Cretácico,Cuenca Alamor Lancones,Unidad,Chaguarpamba,Sedimentos volcánicos y lutitas,
Mesozoico,Cretácico,Cuenca Alamor Lancones,Volcánicos,Bramaderos,"Aglomerados, tobas, grauvacas",
Mesozoico,Cretácico,Cuenca Alamor Lancones,Formación,Celica,Lavas andesíticas-basálticas y piroclásticas.,
Mesozoico,Cretácico,Cuenca Alamor Lancones,Unidad,Punta de Piedra,"Basaltos, tobas y brechas volcánicas.",
`}, { role: "user", content: question }],
    temperature: 0.7
  };

  axios.post('https://api.openai.com/v1/chat/completions', data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    }
  })
  .then(response => {
    console.log(response.data.choices[0].message.content);
    console.log(response.data.usage.total_tokens);
    res.json(response.data);
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Something went wrong!');
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'geoecuador.site', 'index.html'));
  //res.sendFile(path.join(__dirname, '../public_html/geoecuador.site', 'index.html')); SERVER
});

console.log(__dirname);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
