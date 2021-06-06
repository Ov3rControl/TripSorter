type stylesType = {
  [key: string]: React.CSSProperties;
};

export const styles: stylesType = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 300,
    padding: 20,
  },
  select: {
    margin: 8,
  },
  buttonGroup: {
    marginBottom: 8,
  },
  tripCard: {
    backgroundColor: "gainsboro",
    padding: "0px 6px",
    display: "flex",
    justifyContent: "space-between",
    margin: "8px 0px",
  },
  tripDetails: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  tripPrice: {
    fontWeight: "bold",
  },
  tripHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seperator: {
    margin: "0px 10px",
    color: "white",
  },
  tripBody: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  subTitle: {
    fontSize: 14,
  },
};
