<!-- 
	removes any element not from http://www.topografix.com/GPX/1/1 namespace 
	TODO: full test this is my first naive version
-->
<xsl:stylesheet version="3.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:gpx="http://www.topografix.com/GPX/1/1"
	>
	<!--
	deep-copy, shallow-copy, deep-skip, shallow-skip, text-only-copy, or fail, the default being text-only-copy.
	-->
    <xsl:mode on-no-match="shallow-copy"/>
    <xsl:template match="*[namespace-uri(.)!='http://www.topografix.com/GPX/1/1']">
    	<xsl:comment>removed by gpx-only.xslt</xsl:comment>
    </xsl:template>

</xsl:stylesheet>