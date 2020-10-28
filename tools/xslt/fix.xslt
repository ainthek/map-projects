<!-- 
	adds names and other attributes
-->
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:gpx="http://www.topografix.com/GPX/1/1" xmlns="http://www.topografix.com/GPX/1/1" exclude-result-prefixes="gpx">
  <xsl:param name="gpx.filename" />
  <xsl:param name="gpx.basename" />
  <xsl:mode on-no-match="shallow-copy" />
  <xsl:template match="gpx:metadata">
    <trk>
      <xsl:call-template name="metadata.name" />
      <xsl:apply-templates select="@*|node()" />
    </trk>
  </xsl:template>
  <xsl:template match="gpx:trk">
    <trk>
      <xsl:call-template name="trk.name" />
      <xsl:apply-templates select="@*|node()" />
    </trk>
  </xsl:template>
  <!-- .................................................................................... -->
  <xsl:template name="metadata.name">
    <xsl:choose>
      <xsl:when test="./gpx:name">
        <name>
          <xsl:value-of select="./gpx:name" />
        </name>
      </xsl:when>
      <xsl:otherwise>
        <xsl:comment>fix needed:metadata.name</xsl:comment>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="trk.name">
    <xsl:choose>
      <!-- original -->
      <xsl:when test="./gpx:name">
        <name>
          <xsl:value-of select="./gpx:name" />
        </name>
      </xsl:when>
      <!-- generated -->
      <xsl:otherwise>
        <name>
          <xsl:choose>
            <xsl:when test="/gpx:gpx/gpx:metadata/gpx:name">
              <xsl:value-of select="/gpx:gpx/gpx:metadata/gpx:name" />
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$gpx.basename" />
            </xsl:otherwise>
          </xsl:choose>
          <!--track: <xsl:value-of select="count(preceding-sibling::*[local-name()='trk'])+1" />-->
          <xsl:comment>FIXED:trk.name</xsl:comment>
        </name>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>