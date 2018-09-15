<template>
<v-layout>
<p>Works:</p>
<ol>
  <li>Tested on Chrome on Windows and OS X</li>
  <li>Tested on Firefox on OS X (works but jittery)</li>
  <li>Tested on IE11 on Windows</li>
  <li>Very efficient JS, would be even faster in Vue</li>
  <li>Auto-corrects frozen body total height to accommodate any visible scroll bar (in Vue, would call this on mount as well).</li>
</ol>
<p>Caveats:</p>
<ol>
   <li>As with vue-scrolling-table, at least the columns that are scrolled must have fixed widths. Each column can have a different width, but it can't be automatic based on content.</li>
  <li>All rows (thead and tbody) must have a fixed height. Each row can have a different height, but it can't be automatic based on content.</li>
  <li>There may be visible lag in scroll syncing depending on device speed and browser. Debouncing may help.</li>
  <li>Integrating this with vue-scrolling-table would require retooling of the slots. Would probably treat it as two tbody and two tbody slots, one for fixed and one for scrolling.</li>
  <li>TFOOT would not be able to stretch the entire width of the table. Would have to reimplement the tfoot slot as a div.</li>
  <li>Might not allow CSS tooltips to float correctly over both tables.</li>
</ol>
<p class="container1">
<p class="container2">
<table class="frozen">
  <thead>
    <tr><th>1</th><th>2</th><th>3</th><th>4</th></tr>
  </thead>
<tbody id="frozenBody" onscroll="syncScroll(event)">
   <tr><td>a1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
    <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
   <tr><td>z1</td><td>2</td><td>3</td><td>4</td></tr>
  </tbody>
  </table>

  <table class="scrolled">
<thead id="scrolledHead" onscroll="syncScroll(event)">
  <tr><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th></tr>
  </thead>
  <tbody id="scrolledBody" onscroll="syncScroll(event)">
        <tr><td>a5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
       <tr><td>z5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
  </tbody>
</table>
  </p></p>

  </v-layout>

</template>
<script>
import {mapState} from 'vuex'
import Old1 from '@/services/Old1Service'

function syncScroll (e) {
      const fb = document.getElementById('frozenBody')
      const sb = document.getElementById('scrolledBody')
      const sh = document.getElementById('scrolledHead')
      const fbt = fb.scrollTop
      const sbt = sb.scrollTop
      const sbl = sb.scrollLeft
      const shl = sh.scrollLeft
      var ev = e || window.event
      const t = ev.target || ev.srcElement
      const scrollbarHeight = fb.clientHeight - sb.clientHeight
      if (scrollbarHeight > 0) {
        fb.style.marginBottom = scrollbarHeight + 'px'
      }
      if (t === fb) {
        if (fbt !== sbt) sb.scrollTop = fbt
      } else if (t === sb) {
        if (sbl !== shl) sh.scrollLeft = sbl
        if (fbt !== sbt) fb.scrollTop = sbt
      } else {
        if (sbl !== shl) sb.scrollLeft = shl
      }
    }

export default {
  data () {
    return {
      data1: []
    }
  },

  async mounted () {
    if (this.isUserLoggedIn) {
      this.tableData4 = (await Old1.all()).data
      window.document.title = 'Old-1'
    } else {
      window.close()
    }
  },

  methods: {

  },
  computed: {
    ...mapState([
      'isUserLogin',
      'user'
    ])

  }
}
</script>
<style>
* {
  box-sizing: border-box;
}
p.container1 {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 10em;
}
p.container2 {
  display: flex;
  flex-direction: row;
  border: 1px solid #999;
  width: 100%;
	height: 100%;
  max-height: 100%;
}
table {
  display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	border-collapse: collapse;
	overflow: hidden;
  background-color: #ccc;
}
table.frozen {
  flex: 1 0 auto;
  -ms-overflow-style: none;
}
thead {
	flex: 0 0 auto;
	display: block;
	overflow: hidden;
}
tbody {
	display: block;
	flex: 1 1 auto;
	overflow: hidden;
}
table.scrolled tbody {
  overflow: scroll;
}
table.scrolled thead {
  overflow-y: scroll;
  overflow-x: hidden;
}
table.frozen tbody {
  overflow-y: scroll;
}
table.frozen tbody::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}
th {
  background-color: #f0f0f0;
}
td {
  background-color: white;
}
td, th {
  min-width: 10em;
  max-width: 10em;
  height: 2em;
  max-height: 2em;
  min-height: 2em;
  width: 10em;
  border: 1px solid #ccc;
}
</style>
