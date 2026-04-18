import React, { useMemo, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import BrowseDetail from "./pages/BrowseDetail";
import Annotation from "./pages/Annotation";
import Statistics from "./pages/Statistics";
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import JBrowse from "./pages/JBrowse";
import Download from "./pages/Download";
import Links from "./pages/Links";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import RMlevelDiff from "./pages/tools/RMlevelDiff";
import RMplantVar from "./pages/tools/RMplantVar";
import RNAmodNet from "./pages/tools/RNAmodNet";
import Blast from "./pages/tools/Blast";
import GeneEditor from "./pages/tools/GeneEditor";
import { topNav, toolsMenu } from "./data/mockStats";

function App() {
  const [page, setPage] = useState("Home");
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedBrowseRow, setSelectedBrowseRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigateToSearchResults = (keyword) => {
    const q = (keyword ?? globalSearch).trim();
    setSearchQuery(q);
    setPage("SearchResults");
  };

  const commonPageProps = {
    setPage,
    setSelectedBrowseRow,
    selectedBrowseRow,
    globalSearch,
    setGlobalSearch,
    searchQuery,
    setSearchQuery,
    navigateToSearchResults,
  };

  const CurrentPage = useMemo(() => {
    switch (page) {
      case "Home":
        return <Home {...commonPageProps} />;
      case "Browse":
        return <Browse {...commonPageProps} externalSearchKeyword={globalSearch} />;
      case "BrowseDetail":
        return <BrowseDetail {...commonPageProps} row={selectedBrowseRow} />;
      case "Annotation":
        return <Annotation {...commonPageProps} />;
      case "Statistics":
        return <Statistics {...commonPageProps} />;
      case "Search":
        return <Search {...commonPageProps} />;
      case "SearchResults":
        return <SearchResults {...commonPageProps} query={searchQuery} />;
      case "JBrowse":
        return <JBrowse {...commonPageProps} />;
      case "Download":
        return <Download {...commonPageProps} />;
      case "Links":
        return <Links {...commonPageProps} />;
      case "Help":
        return <Help {...commonPageProps} />;
      case "Contact":
        return <Contact {...commonPageProps} />;
      case "RMlevelDiff":
        return <RMlevelDiff {...commonPageProps} />;
      case "RMplantVar":
        return <RMplantVar {...commonPageProps} />;
      case "RNAmodNet":
        return <RNAmodNet {...commonPageProps} />;
      case "Blast":
        return <Blast {...commonPageProps} />;
      case "GeneEditor":
        return <GeneEditor {...commonPageProps} />;
      default:
        return <Home {...commonPageProps} />;
    }
  }, [page, globalSearch, selectedBrowseRow, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f5f7f5] text-slate-800">
      <Header
        page={page}
        setPage={setPage}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        navigateToSearchResults={navigateToSearchResults}
        topNav={topNav}
        toolsMenu={toolsMenu}
      />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-6">{CurrentPage}</main>
      <Footer setPage={setPage} />
    </div>
  );
}

export default App;
