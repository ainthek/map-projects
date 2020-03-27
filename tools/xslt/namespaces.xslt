<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text"/>
    <xsl:key name="kElemByNSURI" match="*|@*" use="namespace-uri()"/>
    <xsl:template match="/">
        <xsl:for-each select=
            "(//*|//@*)[namespace-uri()!='']
                       [count(.|key('kElemByNSURI',namespace-uri())[1])=1]">
            <xsl:value-of select="concat(namespace-uri(),'&#xA;')"/>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
<!-- from https://stackoverflow.com/questions/3747049/xslt-how-to-get-a-list-of-all-used-namespaces -->