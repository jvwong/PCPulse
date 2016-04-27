from base import BaseTest


class Search(BaseTest):

    def test_search(self):
        paths = (
            'search.xml?q=Q06609',
            'search.json?q=Q06609',
            'search?q=xrefid:Q06609',
            'search.json?q=Q06609&type=pathway',
            'search?q=brca2&type=proteinreference&organism=homo%20sapiens&datasource=pid',
            "search.xml?q=name:'col5a1'&type=proteinreference&organism=9606",
            'search?q=brc*&type=control&organism=9606&datasource=reactome',
            'search?q=a*&page=3',
            'search?q=+binding%20NOT%20transcription*&type=control&page=0',
            'search?q=pathway:immune*&type=conversion',
            'search?q=*&type=pathway&datasource=reactome',
            'search?q=*&type=biosource'
        )

        for path in paths:
            self.get_test(self.__class__.__name__, path)


class Get(BaseTest):

    def test_get(self):
        paths = (
            'get?uri=http://identifiers.org/uniprot/Q06609',
            'get?uri=COL5A1',
            'get?uri=http://identifiers.org/reactome/R-HSA-201451'
        )

        for path in paths:
            self.get_test(self.__class__.__name__, path)


class Graph(BaseTest):

    def test_graph(self):
        paths = (
            'graph?source=P20908&kind=neighborhood',
            'graph?source=COL5A1&kind=neighborhood',
            'graph?source=http://identifiers.org/uniprot/P20908&kind=neighborhood&format=BINARY_SIF',
        )

        for path in paths:
            self.get_test(self.__class__.__name__, path)


class Traverse(BaseTest):

    def test_traverse(self):
        paths = (
            'traverse?uri=http://identifiers.org/uniprot/P38398&path=ProteinReference/organism/displayName',
            'traverse?uri=http://identifiers.org/uniprot/P38398&uri=http://identifiers.org/uniprot/Q06609&path=ProteinReference/organism',
            'traverse?uri=http://identifiers.org/uniprot/Q06609&path=ProteinReference/entityReferenceOf:Protein/name',
            'traverse?uri=http://identifiers.org/uniprot/P38398&path=ProteinReference/entityReferenceOf:Protein',
            'traverse?uri=http://identifiers.org/uniprot/P38398&uri=http://identifiers.org/taxonomy/9606&path=Named/name'
        )

        for path in paths:
            self.get_test(self.__class__.__name__, path)


class Top(BaseTest):

    def test_top(self):
        paths = (
            'top_pathways',
            'top_pathways.json'
        )

        for path in paths:
            self.get_test(self.__class__.__name__, path)