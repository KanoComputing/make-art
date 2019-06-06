using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Foundation.Diagnostics;

namespace MakeArt
{
    class Logger
    {
        public LoggingChannel Channel = new LoggingChannel("MakeArt_Channel", null);
        public FileLoggingSession Session = new FileLoggingSession("MakeArt_Session");

        private static Logger DefaultLogger = null;

        public Logger()
        {
            Session.AddLoggingChannel(Channel);
        }
        public static Logger getLogger()
        {
            if (DefaultLogger == null) {
                DefaultLogger = new Logger();
            }
            return DefaultLogger;
        }
        public void Dispose()
        {
            Channel.Dispose();
            Session.Dispose();
            if (this == DefaultLogger) {
                DefaultLogger = null;
            }
        }
    }
}
