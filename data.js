/*
  CUSTOMIZE THIS FILE.

  1) locations: reusable location cards
     id, name, color

  2) connections: directional adjacency map
     connections[ORIGIN_ID][DESTINATION_ID] = [OPTIONS]

  Each option can contain:
     id           unique option key within that connection
     busLine      label such as "B42"
     stopName     optional stop / intersection note
     stopcode     MTA Bus Time stop code used to generate the URL

  BEHAVIOR:
  - No options for a destination: that destination won't be shown.
  - Choosing a destination displays its bus options in the third step.
  - Tapping a bus option opens its MTA Bus Time search.
  - Connections are directional. Configure the reverse direction separately.

  Replace sample stop codes and bus details before using the site.
*/

const locations_data = {
  home: {
    name: "Home",
    color: "#D82233"
  },
  jacksonheights: {
    name: "Jackson Heights",
    color: "#0062CF"
  },
  flushing: {
    name: "Flushing",
    color: "#9A38A1"
  },
  macy: {
    name: "Macy's Mall",
    color: "#EB6800"
  },
  elmhurst: {
    name: "Elmhurst",
    color: "#F6BC26"
  },
};

const connections_data = {
    home: {
      jacksonheights: [
        {
          busLine: "Q47",
          stopName: "80th St",
          stopcode: "551544"
        }
      ],
      flushing: [
        {
          busLine: "Q98",
          stopName: "Grand Ave",
          stopcode: "503475"
        }
      ],
      macy: [
        {
          busLine: "Q14",
          stopName: "Walgreens",
          stopcode: "551299"
        }
      ],
      elmhurst: [
        {
          busLine: "Q58",
          stopName: "Grand Ave",
          stopcode: "503475"
        }
      ]
    },

    jacksonheights: {
      home: [
        {
          busLine: "Q47",
          stopName: "Fay Da",
          stopcode: "505526"
        }
      ]
    },

    flushing: {
      home: [
        {
          busLine: "Q98",
          stopName: "Capital One",
          stopcode: "505424"
        }
      ]
    },

    macy: {
      home: [
        {
          busLine: "Q14",
          stopName: "Park",
          stopcode: "553196"
        },
        {
          busLine: "Q98/Q59",
          stopName: "Macy's",
          stopcode: "504404"
        },
      ],
      flushing: [
        {
          busLine: "Q98",
          stopName: "Queens Blvd",
          stopcode: "504400"
        }
      ],
      elmhurst: [
        {
          busLine: "Q53-SBS",
          stopName: "Macy's",
          stopcode: "504404"
        }
      ]
    },

    elmhurst: {
      home: [
        {
          busLine: "Q98",
          stopName: "Macy's",
          stopcode: "503522"
        }
      ],
      macy: [
        {
          busLine: "Q53-SBS",
          stopName: "Akino",
          stopcode: "553214"
        }
      ]
    },
};
