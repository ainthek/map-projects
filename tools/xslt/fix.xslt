<!-- 
  adds names and other attributes
-->
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:gpx="http://www.topografix.com/GPX/1/1" xmlns="http://www.topografix.com/GPX/1/1" exclude-result-prefixes="gpx">
  <xsl:param name="gpx.filename" />
  <xsl:param name="gpx.basename" />
  <xsl:mode on-no-match="shallow-copy" />
  <xsl:template match="gpx:trk">
    <trk>
      <xsl:call-template name="trk.name" />
      <xsl:call-template name="trk.src" />
      <xsl:apply-templates select="@*|node()" />
    </trk>
  </xsl:template>
  <!-- .................................................................................... -->
  <!-- .................................................................................... -->
  <xsl:template match="/gpx:gpx/gpx:trk/gpx:name"></xsl:template>
  <xsl:template name="trk.name">
    <xsl:choose>
      <xsl:when test="./gpx:name">
        <name>
          <xsl:choose>
            <xsl:when test="./gpx:name[normalize-space()]">
              <!-- because mapy.cz and others produce empty string tags -->
              <xsl:value-of select="normalize-space(./gpx:name)" />
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$gpx.basename" />
              <xsl:comment>FIXED:</xsl:comment>
            </xsl:otherwise>
          </xsl:choose>
        </name>
      </xsl:when>
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
          <xsl:comment>FIXED:</xsl:comment>
        </name>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <!-- .................................................................................... -->
  <xsl:template match="/gpx:gpx/gpx:trk/gpx:src"></xsl:template>
  <xsl:template name="trk.src">
    <xsl:choose>
      <xsl:when test="./gpx:src">
        <src>
          <xsl:choose>
            <xsl:when test="./gpx:src[normalize-space()]">
              <xsl:value-of select="normalize-space(./gpx:src)" />
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="/gpx:gpx/@creator" />
              <xsl:comment>FIXED:</xsl:comment>
            </xsl:otherwise>
          </xsl:choose>
        </src>
      </xsl:when>
      <xsl:otherwise>
        <src><xsl:value-of select="/gpx:gpx/@creator" /></src>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>