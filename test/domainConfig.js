export default domainConfig = {
  "includeScripts" : [ "braunhamburg" ],
  "routes" : {
    "trends" : "tag/%1$s",
    "userTag" : "tag/%2$s",
    "story" : "story/%2$s_%3$s"
  },
  "shop" : true,
  "popup" : {
    "width" : 360,
    "height" : 220
  },
  "signin" : {
    "returnUrl" : "editor"
  },
  "editor" : {
    "returnUrl" : "",
    "productApi" : "http://stories.braun-hamburg.de/amazineproduct"
  },
  "embed" : {
    "embedUser" : "braunhamburg",
    "magazineUrl" : "www.braun-hamburg.de",
    "rootPath" : "stories",
    "embedDomain" : "braunhamburg",
    "rootElement" : "amazineEmbed",
    "productApiKey" : "6321424181",
    "lang" : "DE",
    "stylaAnalyticsTracker" : "UA-75512366-48",
    "googleTrackingAccount" : [ "UA-28225899-2", "UA-51795421-2" ],
    "customFontUrl" : "//fonts.googleapis.com/css?family=Roboto:400,400italic,700",
    "feature" : {
      "feed_poweredBy" : true,
      "client_feedSearch" : true,
      "story_feedInBackground" : true,
      "jsf_seo" : true,
      "domain_boards" : true,
      "profile_showBoards" : true,
      "newsletter_tool" : true,
      "feed_disableLeadStories" : true
    },
    "l10n" : [ {
      "product" : {
        "inStock" : {
          "DE" : "Lieferung innerhalb von 1-3 Werktagen"
        }
      }
    } ],
    "shop" : {
      "productTab" : "braunhamburg",
      "type" : "product",
      "productApi" : {
        "default" : "/amazineproduct"
      },
      "returnPath" : {
        "signin" : "editor",
        "editor" : ""
      }
    }
  },
  "theme" : {
    "hff" : "Georgia",
    "hfw" : "400",
    "hfsi" : "48px",
    "hfsc" : "1.05em",
    "hfs" : "normal",
    "htd" : "none",
    "hls" : "0em",
    "hta" : "left",
    "htc" : "#000000",
    "htt" : "none",
    "sff" : "Roboto, sans-serif",
    "sfw" : "400",
    "sfs" : "18px",
    "slh" : "1.5em",
    "stc" : "#000000",
    "sffs" : "15px",
    "strm" : "...",
    "strmw" : "bold",
    "strmd" : "none",
    "spib" : "9%",
    "sibc" : "#FFFFFF",
    "bqf" : "Georgia",
    "bqfw" : "400",
    "bqfs" : "italic",
    "bqtt" : "none",
    "shf" : "Roboto, sans-serif",
    "shfw" : "400",
    "shtt" : "none",
    "shfst" : "normal",
    "bbc" : "#000000",
    "btc" : "#FFFFFF",
    "bhbc" : "#C49544",
    "bhtc" : "#FFFFFF",
    "babc" : "#000000",
    "batc" : "#ffffff",
    "bibc" : "#000000",
    "bitc" : "#FFFFFF",
    "bihbc" : "#000000",
    "bihtc" : "#FFFFFF",
    "biabc" : "#000000",
    "biatc" : "#ffffff",
    "ltc" : "#000000",
    "lhtc" : "#A1853B",
    "latc" : "#000000",
    "ltd" : "underline",
    "lfw" : "inherit",
    "idc" : "#FFFFFF",
    "idb" : "#000000",
    "idv" : "visible",
    "cnf" : "inherit",
    "cnfw" : "400",
    "cnfs" : "normal",
    "stbr" : "0px",
    "stbc" : "#f0efea",
    "stboc" : "#f0efea",
    "stsa" : "20px",
    "stam" : "-10px",
    "stss" : "2px",
    "stsb" : "8px",
    "stbbr" : "5px",
    "stbs" : "0 2px 9px -3px #333",
    "stpbd" : "none",
    "stpbt" : "none",
    "stpbc" : "#000000",
    "stphs" : "24px",
    "stphl" : "1em",
    "stphc" : "#000000",
    "stphu" : "none",
    "stpopd" : "none",
    "stpopc" : "#000000",
    "stpxd" : "inline-block",
    "stpxc" : "#000000",
    "stpsd" : "block",
    "stpsc" : "#0093b9",
    "stpps" : "25px",
    "stppc" : "#000000",
    "stppb" : "normal",
    "cnd" : "visible",
    "pbc" : "#ffffff",
    "pbo" : "0.7",
    "pbrgba" : "rgba(255,255,255,0.7)",
    "customStyles" : "#amazine \n{\n    background-color: #FFF;\n}\n\n#amazine .Boardbar, #amazine .ProfileSearch\n{\n    padding-top: 7px !important;\n}\n\n#amazine .ProfileSearch .searchForm .searchField \n{\n    font-family: \"Roboto\", sans-serif;\n    background-color: #F0EFEA;\n    font-size: 14px;\n}\n\n#amazine .ProfileSearch:not(.widthMobile) .searchForm .searchField \n{\n    width: 272px;\n}\n\n#amazine .ProfileSearch .searchForm input.searchField::-webkit-input-placeholder \n{\n  color: #312d29 !important; \n}\n\n#amazine .ProfileSearch .searchForm input.searchField::-moz-placeholder \n{\n  color: #312d29 !important;\n  opacity: 1; \n}\n\n#amazine .ProfileSearch .searchForm input.searchField::-ms-input-placeholder \n{\n  color: #312d29 !important; \n}\n\n/* no taxes please */\n.taxInfo \n{\n   display: none !important;\n}\n\n.price.headlineFont:after \n{\n    content: ' inkl. MwST.' !important;\n    font-size: 13px !important;\n}\n\n/* but we need a different tax statement */\n#amazine .submitForm:before \n{\n    content: \"Kostenloser Versand innerhalb Deutschlands (Versandkosten International)\";\n    font-size: 12px;\n    color: #969696;\n}"
  }
}