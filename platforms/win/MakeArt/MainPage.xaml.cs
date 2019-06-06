using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

using System.Diagnostics;

namespace MakeArt
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private Logger Log = Logger.getLogger();

        private Uri CurrentUri;

        public MainPage()
        {
            InitializeComponent();
            this.webview.NavigationFailed += Webview_NavigationFailed;
            Log.Channel.LogEvent("Main page initialised");
        }
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            Log = Logger.getLogger();
            try {
                CurrentUri = new Uri(e.Parameter as string);
            } catch (Exception ex) { }
            this.webview.Navigate(CurrentUri);
        }

        private void Webview_NavigationFailed(object sender, WebViewNavigationFailedEventArgs e)
        {
            Frame.Navigate(typeof(Offline), CurrentUri.ToString());
        }
    }
}
