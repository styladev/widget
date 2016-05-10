let stories = {
    "stories":[ {
      "id" : 993241,
      "title" : "Shine and Shimmer",
      "description" : "[{\"type\":\"text\",\"content\":\"<p>Man schrieb das Jahr 1975, als der gelernte Schuhmacher Andrea Santoni in seinem Geburtsort Corridonia seine eigene Schuhfabrikation gründete – und damit den Grundstein der heute weltbekannten und exklusiven Marke Santoni legte. Die hochwertige Schuhmarke ist in allen großen Städten der Welt, wie New York, London, Mailand, Tokio oder auch Moskau vertreten und ihre edlen Produkte allseits begehrt. Berühmt ist das Label vor allem für seine handgefertigten Nähte, die äußerst hohe Fertigungsqualität sowie die besondere Verarbeitung des Leders. Diesem wird nämlich durch eine spezielle Bearbeitung von Hand eine mehrschichtige Lederfärbung verpasst, die jedes Schuhmodell zu einem optischen Unikat macht.&nbsp;<br></p>\"},{\"type\":\"collage\",\"length\":1},{\"type\":\"text\",\"content\":\"<p><span style=\\\"font-style: normal; font-weight: normal\\\">Mit diesem Wissen ist es natürlich naheliegend, dass die ledernen Begleiter einer sehr guten Pflege bedürfen, um eine besonders hohe Lebensdauer zu haben und stets wie neu zu scheinen und schimmern. Von den richtigen Schuhspannern, über einen Schuhlöffel für den perfekten Einstig, bis hin zu verschiedenen Bürsten und&nbsp;</span><span style=\\\"font-style: normal; font-weight: normal\\\">Wachsen</span><span style=\\\"font-style: normal; font-weight: normal\\\">&nbsp;für den richtigen Putz und die nachhaltige Pflege sowie Politur bietet Santoni auch hier seinen Kunden ein reichhaltiges Sortiment.&nbsp;</span></p><p><a href=\\\"http://www.braun-hamburg.de/schuhe/schuhpflege.html\\\" target=\\\"_blank\\\" class=\\\"extLink\\\">Finden Sie unsere aktuelle Auswahl an Produkten zur optimalen Schuhpflege hier – darunter auch die exklusive Schuhcreme aus dem Hause Santoni.</a></p>\"}]",
      "domain" : "braunhamburg",
      "owner" : {
        "id" : 1239049
      },
      "images" : [ {
        "id" : 818370
      } ],
      "add" : false,
      "addCount" : 1,
      "like" : false,
      "likeCount" : 0,
      "hidden" : false,
      "configuration" : {
        "metaTitle" : "Shine and Shimmer",
        "metaDescription" : "Man schrieb das Jahr 1975, als der gelernte Schuhmacher Andrea Santoni in seinem Geburtsort Corridonia seine eigene Schuhfabrikation gründete – und damit ...",
        "lead" : false,
        "style" : "sh lt r10",
        "template" : "ds"
      },
      "timeCreated" : 1462186463000,
      "timePublished" : 1462690800000,
      "scheduled" : false,
      "permalink" : {
        "id" : 154938,
        "slug" : "shine-and-shimmer_993241"
      },
      "externalPermalink" : "shine-and-shimmer_993241",
      "commentCount" : 0,
      "screenshotFilename" : "25672_09772.jpeg"
      }
    ]
};

let images = {
	"818370": {
        "id": 818370,
		"caption": "photocredit Instagram: @Santonioffical",
		"shop": false,
		"fileName": "23268_06022.jpeg",
		"ratio": 1,
		"width": 640,
		"pageUrl": "https://www.instagram.com/santoniofficial/",
		"video": false,
		"timeCreated": 1462182507000
	}
};

let tests = function( stylaWidget )
{
    QUnit.test( 'buildStory', function ( assert )
    {
        this.images = images;
        let story = stories.stories.map( stylaWidget.buildStory );
        assert.ok ( true );
    } );

};

export default tests;
